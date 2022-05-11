import React, {useState} from 'react'
import List from './List'
import {CRUDProvider} from './CRUDProvider'
import ActionButtons from './ActionButtons'
import ChangeViewButtons from './ChangeViewButtons'
import styles from './TreeList.module.scss'
import ToggleChildrenMoving from './ToggleChildrenMoving'
import DataPrint from './DataPrint'


const TreeList = () => {

	const [isDataPrinting, setIsDataPrinting] = useState(true)

	return (
		<CRUDProvider>
			<div className="">
				<div className="inline-flex justify-center w-full mb-5 child:grow">
					<ChangeViewButtons/>
				</div>

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
								onClick={e => setIsDataPrinting(prev => !prev)}
								className="underline  hover:text-gray-200"
							>
								{!isDataPrinting ? 'Show data' : 'Hide data'}
							</button>

						</div>

						<div className="flex flex-col sm:flex-row">
							<div className="grow -mt-3">
								<List/>
							</div>
							{isDataPrinting && <div className="sm:ml-5 sm:min-w-[240px] sm:w-[300px] sm:max-w-[300px] sm:mt-0 mt-3 grow-0">
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