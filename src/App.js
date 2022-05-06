import './index.scss'
import FullNestedComponentsList from './Second/FullNestedComponentsList'
import NonNestedComponentsList from './First/NonNestedComponentsList'


function App() {
	return (
		<div className="app">
			<div className="wrapper">
				<NonNestedComponentsList/>
				<FullNestedComponentsList/>
			</div>
		</div>
	)
}

export default App
