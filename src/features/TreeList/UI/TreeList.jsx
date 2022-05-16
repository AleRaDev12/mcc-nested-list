import React, {useState} from 'react'
import {CRUDProvider} from '../model/CRUDProvider'
import ActionButtons from './ActionButtons/ActionButtons'
import ChangeViewButtons from './ChangeViewButtons/ChangeViewButtons'
import styles from './TreeList.module.scss'
import ToggleChildrenMoving from './ToggleChildrenMoving'
import DataPrint from './DataPrint/DataPrint'
import List from './List/List'


const TreeList = () => {

	const [isDataShow, setIsDataShow] = useState(true)

	return (
		<CRUDProvider>
			<div className="">
				<ChangeViewButtons/>

				<div>
					<div
						className={styles.treeList}
					>
						<div className="mb-5 flex justify-between">

							<div className="grow flex items-center">
								<ActionButtons/>

								<div className="ml-3">
									<ToggleChildrenMoving/>
								</div>
							</div>

							<button
								onClick={e => setIsDataShow(prev => !prev)}
								className="underline  hover:text-gray-200"
							>
								{!isDataShow ? 'Show data' : 'Hide data'}
							</button>

						</div>

						<div className="flex flex-col sm:flex-row">
							<div className="grow -mt-3">
								<List/>
							</div>
							{isDataShow && <div className="sm:ml-5 sm:min-w-[240px] sm:w-[300px] sm:max-w-[300px] sm:mt-0 mt-3 grow-0">
								<DataPrint/>
							</div>
							}
						</div>
					</div>

				</div>
			</div>

		</CRUDProvider>
	)
}

export default TreeList