import React from 'react'
import {CRUDProvider} from './ItemContext'
import List from './List'
import Buttons from './Buttons'


const FullNestedComponentsList = () => {

	return (
		<CRUDProvider>
			<div className="treeList">
				<div className="flex justify-center my-5 text-xl">Данная реализация ещё не готова</div>
				<Buttons/>
				<List/>
			</div>
		</CRUDProvider>
	)
}

export default FullNestedComponentsList