import React from 'react'
import {useNonNestedComponentsList} from './ItemContext'


const ToggleChildrenMoving = () => {

	const items = useNonNestedComponentsList()

	return (
		<div className="flex justify-center my-5">
			<label className="inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					className="checkbox"
					onChange={e => items.options.isMoveWithChildrenToggle()}
					checked={items.options.isMoveWithChildren}
				/>
				<span className="ml-2">Перемещать вместе/с учётом вложенных элементов</span>
			</label>
		</div>
	)
}

export default ToggleChildrenMoving