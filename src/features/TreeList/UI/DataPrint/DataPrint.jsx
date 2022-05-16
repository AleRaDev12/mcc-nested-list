import React, {useState} from 'react'
import {useNestedList} from '../../model/CRUDProvider'
import classNames from 'classnames'
import styles from './DataPrint.module.scss'


const DataPrint = () => {

	const context = useNestedList()
	const [dataType, setDataType] = useState(1)

	return (
		<div className={styles.DataPrint}>
			<div className="inline-flex justify-center w-full mb-5 child:grow">
				<button
					onClick={e => setDataType(1)}
					className={classNames({'!bg-gray-600': dataType === 1})}
				>
					Default
				</button>
				<button
					onClick={e => setDataType(2)}
					className={classNames({'!bg-gray-600': dataType === 2})}
				>
					Actual
				</button>
				<button
					onClick={e => setDataType(3)}
					className={classNames({'!bg-gray-600': dataType === 3})}
				>
					Printed
				</button>
			</div>

			<pre>
			Data size (JSON symbols):

				{dataType === 1 && context.defaultData &&
					<> {JSON.stringify(context.defaultData).length}

						<br/>
						{JSON.stringify(context.defaultData, null, ' ')}
					</>
				}

				{dataType === 2 && context.items &&
					<> {JSON.stringify(context.items).length}

						<br/>
						{JSON.stringify(context.items, null, ' ')}
					</>
				}

				{dataType === 3 && context.getItemsForPrint() &&
					<> {JSON.stringify(context.getItemsForPrint()).length}

						<br/>
						{JSON.stringify(context.getItemsForPrint(), null, ' ')}
					</>
				}

        </pre>
		</div>
	)
}

export default DataPrint