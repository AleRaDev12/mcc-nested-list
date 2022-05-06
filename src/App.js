import './index.scss'
import FullNestedComponentsList from './Second/FullNestedComponentsList'
import NonNestedComponentsList from './First/NonNestedComponentsList'
import {useState} from 'react'


function App() {

	const [implementation, setImplementation] = useState(1)

	const changeImplementation = (i) => {
		setImplementation(i)
	}

	return (
		<div className="app">

			<div className="wrapper">
				<div className="inline-flex justify-center flex w-full pb-5">
					<button
						onClick={e => changeImplementation(1)}
						className="bg-gray-900 hover:bg-gray-700 text-xs text-gray-100 font-bold py-2 px-4 rounded-l transition ease-in"
					>
						Первый вариант
					</button>
					<button
						onClick={e => changeImplementation(2)}
						className="bg-gray-900 hover:bg-gray-700 text-xs text-gray-100 font-bold py-2 px-4  transition ease-in"
					>
						Второй вариант
					</button>
					<button
						onClick={e => changeImplementation(2)}
						className="bg-gray-900 text-xs text-gray-100 font-bold py-2 px-4 rounded-r transition ease-in cursor-wait"
					>
						Третий вариант (не готов)
					</button>
				</div>

				{implementation === 1 ? <NonNestedComponentsList/> : <FullNestedComponentsList/>}
			</div>
		</div>
	)
}

export default App
