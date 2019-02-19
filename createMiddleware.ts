type fn = (...args: any[]) => any
type cbMasterListObjectType =  {
	callback: fn,
	global?: boolean,
	event?: string
}

interface initMiddlewaresReturn {
	registerMiddleware: (event: string | fn, ...args: any) => void,
	executeMiddleware: (event: string, ...args: any) => void
}

export function initMiddlewares(): initMiddlewaresReturn {
	let cbMasterList : cbMasterListObjectType[] = []
	function register(event: string | fn, ...callbacks: fn[]) {
		if(typeof event == 'function') {
			cbMasterList.push(...[event, ...callbacks].map(v => ({
				callback: v,
				global: true
			})))
		} else {
			cbMasterList.push(...[...callbacks].map(v => ({
				callback: v,
				global: false,
				event
			})))
		}
	}

	async function execute(event: string, ...args: any) {
		const cbQueue = cbMasterList.filter(v => v.global || v.event === event).map(v => v.callback)
		if(!cbQueue.length) {
			return
		}
		let currentState = 0
		async function next() {
			const cb = cbQueue[++currentState]
			if(typeof cb === 'function') {
				await cb(...args, next)
			}
		}
		await cbQueue[currentState](...args, next)
	}

	return {
		registerMiddleware: register,
		executeMiddleware: execute
	}
}

export default initMiddlewares()