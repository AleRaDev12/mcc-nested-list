import './shared/ui/index.scss'
import FullNestedComponentsList from './_temp/Second/FullNestedComponentsList'
import NonNestedComponentsList from './_temp/First/NonNestedComponentsList'
import {useState} from 'react'
import SimpleStylesList from './SampleListWithoutLogic'
import TreeList from './widgets/TreeList'


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
						className="bg-gray-500 text-xs text-gray-300 font-bold py-2 px-4 rounded-r transition ease-in cursor-wait"
					>
						Третий вариант (не готов)
					</button>
				</div>

				<TreeList/>
				{/*<SimpleStylesList/>*/}
				{/*{implementation === 1 ? <NonNestedComponentsList/> : <FullNestedComponentsList/>}*/}
			</div>
		</div>
	)
}

export default App