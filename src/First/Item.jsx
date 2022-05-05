import React, {useEffect, useState} from 'react'
import {TiArrowDownThick, TiArrowLeftThick, TiArrowRightThick, TiArrowUpThick, TiDelete} from 'react-icons/ti'
import {useNonNestedComponentsList} from './ItemContext'


const Item = ({text, level, i}) => {

	const items = useNonNestedComponentsList()
	const [isTextChanging, setIsTextChanging] = useState(false)
	const [nowText, setNowText] = useState()

	useEffect(() => {
		setNowText(text)
	}, [items.items])

	const textChangingToggle = () => {
		setIsTextChanging(prev => !prev)
	}

	const textChangingHandler = (e) => {
		setNowText(e.target.value)
	}

	const keyPressHandler = (e) => {
		if (e.key === 'Enter') {
			items.crud.update(i, nowText)
			textChangingToggle()
		}
	}

	const cancelEditing = () => {
		textChangingToggle()
	}

	return (
		<div className={'treeList--item'} style={{marginLeft: (level - 1) * 1.75 + 'em'}}>
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
					<span onClick={textChangingToggle} data-id={i} className="grow">{text}</span>
					<div>
						<TiArrowLeftThick
							onClick={e => items.crud.toLeft(i)}
							size={24}
						/>
						<TiArrowUpThick
							onClick={e => items.crud.toUp(i)}
							size={24}
						/>
						<TiArrowDownThick
							onClick={e => items.crud.toDown(i)}
							size={24}
						/>
						<TiArrowRightThick
							onClick={e => items.crud.toRight(i)}
							size={24}
						/>
						<TiDelete
							onClick={e => items.crud.delete(i)}
							size={24}/>
					</div>
				</>
			}

		</div>
	)
}

export default Item