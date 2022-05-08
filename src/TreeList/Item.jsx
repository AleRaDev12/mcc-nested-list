import React, {useEffect, useState} from 'react'
import {TiArrowDownThick, TiArrowLeftThick, TiArrowRightThick, TiArrowUpThick, TiDelete} from 'react-icons/ti'
import {useNestedList} from './CRUDProvider'
import styles from './Item.module.scss'


const Item = ({item, i}) => {

	const context = useNestedList()
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
			context.crud.update(item, i, nowText)
			textChangingToggle()
		}
	}

	const cancelEditing = () => {
		textChangingToggle()
	}

	return (
		<li
			className={styles.Item}
			style={item.level && {marginLeft: (item.level - 1) * 1.75 + 'em'}}
		>
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
					<span onClick={textChangingToggle} data-id={null} className={styles.text}>{item.text} {JSON.stringify(i)} </span>
					<div>
						<TiArrowLeftThick
							onClick={e => context.crud.toLeft(item, i)}
							size={24}
						/>
						<TiArrowUpThick
							onClick={e => context.crud.toUp(item, i)}
							size={24}
						/>
						<TiArrowDownThick
							onClick={e => context.crud.toDown(item, i)}
							size={24}
						/>
						<TiArrowRightThick
							onClick={e => context.crud.toRight(item, i)}
							size={24}
						/>
						<TiDelete
							onClick={e => context.crud.delete(item, i)}
							size={24}/>
					</div>
				</>
			}

		</li>
	)
}

export default Item