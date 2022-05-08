import React from 'react'
import {useNestedList} from "./CRUDProvider";


const ToggleChildrenMoving = () => {

    const context = useNestedList()

    return (
        <div className="flex justify-center my-5">
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="checkbox cursor-pointer"
                    onChange={e => context.options.isMoveWithChildrenToggle()}
                    checked={context.options.isMoveWithChildren}
                    disabled={context.implementation !== 1}
                />
                <span className="ml-2">Перемещать вместе/с учётом вложенных элементов</span>
            </label>
        </div>
    )
}

export default ToggleChildrenMoving