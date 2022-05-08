import React, {useState} from 'react'
import List from './List'
import {CRUDProvider} from './CRUDProvider'
import ActionButtons from './ActionButtons'
import ChangeViewButtons from './ChangeViewButtons'
import styles from './TreeList.module.scss'
import ToggleChildrenMoving from "./ToggleChildrenMoving";
import DataPrint from "./DataPrint";

const TreeList = () => {

    const [isDataPrinting, setIsDataPrinting] = useState(true)

    return (
        <CRUDProvider>
            <div>
                <div className="flex justify-center flex-col items-center">
                    <label className="inline-flex items-center cursor-pointer mb-5">
                        <input
                            type="checkbox"
                            onChange={e => setIsDataPrinting(prev => !prev)}
                            checked={isDataPrinting}
                        />
                        <span className="ml-2">Показать данные</span>
                    </label>
                    <ChangeViewButtons/>
                </div>

                <div className='flex'>
                    <div
                        className={styles.treeList}
                    >


                        <ActionButtons/>
                        <ToggleChildrenMoving/>
                        <List/>
                    </div>
                    {isDataPrinting && <DataPrint/>
                    }
                </div>
            </div>

        </CRUDProvider>
    )
}

export default TreeList