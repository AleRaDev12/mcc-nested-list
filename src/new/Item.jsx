import React, {useEffect, useState} from 'react'
import {TiArrowDownThick, TiArrowLeftThick, TiArrowRightThick, TiArrowUpThick, TiDelete} from 'react-icons/ti'
import { useNestedList } from './CRUDProvider'


const Item = ({item}) => {

	const items = useNestedList()
	const [isTextChanging, setIsTextChanging] = useState(false)
	const [nowText, setNowText] = useState()

	useEffect(() => {
		setNowText(item.text)
	}, [item])

	const textChangingToggle = () => {
		setIsTextChanging(prev => !prev)
	}

	const textChangingHandler = (e) => {
		setNowText(e.target.value)
	}

	const keyPressHandler = (e) => {
		if (e.key === 'Enter') {
			items.crud.update(item, nowText)
			textChangingToggle()
		}
	}

	const cancelEditing = () => {
		textChangingToggle()
	}

	return (
		<li className={'treeList--item'}>
			{isTextChanging
				?
				<>
					<input
						type="text"
						value={nowText}
						onChange={e => textChangingHandler(e)}
						onKeyUp={e => keyPressHandler(e)}
						onBlur={cancelEditing}
						autoFocus={true}
					/>
					<span className="text-xs text-gray-200">для сохранения нажмите Enter</span>
				</>
				:
				<>
					<span onClick={textChangingToggle} data-id={null} className="treeList--itemText">{item.text}</span>
					<div>
						<TiArrowLeftThick
							onClick={e => items.crud.toLeft(item)}
							size={24}
						/>
						<TiArrowUpThick
							onClick={e => items.crud.toUp(item)}
							size={24}
						/>
						<TiArrowDownThick
							onClick={e => items.crud.toDown(item)}
							size={24}
						/>
						<TiArrowRightThick
							onClick={e => items.crud.toRight(item)}
							size={24}
						/>
						<TiDelete
							onClick={e => items.crud.delete(item)}
							size={24}/>
					</div>
				</>
			}

		</li>
	)
}

export default Item