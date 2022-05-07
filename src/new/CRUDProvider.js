import { createContext, useContext, useEffect, useState } from 'react'
import { first } from './CRUD'
import { second } from './CRUD'

const CRUDContext = createContext()

export const useNestedList = () => {
	return useContext(CRUDContext)
}

export const CRUDProvider = ({ children }) => {

	const [items, setItems] = useState([])
	const [isMoveWithChildren, setIsMoveWithChildren] = useState(true)
	const [implementation, setImplementation] = useState(1)
	const [choice, setChoice] = useState(first)


	useEffect(() => {
		console.log("Изменился implementation");
		switch (implementation) {
			case 1: setChoice(first)
				break
			case 2: setChoice(second)
				break
		}
		console.log('Теперь choice = ', choice);
		reset()
	}, [implementation])

	const render = () => {
		console.log('render from provider with implement = ', choice);
		return choice.render(items)
	}

	const isMoveWithChildrenToggle = () => {
		setIsMoveWithChildren(prev => !prev)
	}

	const deleteItem = (iOrItem) => {

		console.log('Начало удаления, choice = ', choice);

		switch (choice) {
			case first: setItems(choice.remove(items, iOrItem, isMoveWithChildren))
			console.log('==first');
			break
			case second: setItems(choice.remove(items, iOrItem))
			console.log('==second');
			break
		}
		
	}

	const addItem = () => {
		setItems(choice.add(items))
	}

	const updateTextItem = (iOrItem, newText) => {
		console.log('~~~~~', iOrItem, newText);
		setItems(choice.update(items, iOrItem, newText))
	}

	const toUp = (i) => {
		setItems(first.up(i, isMoveWithChildren, items))
	}

	const toDown = (i) => {
		setItems(first.down(i, isMoveWithChildren, items))
	}

	const toLeft = (i) => {
		setItems(first.left(i, isMoveWithChildren, items))
	}

	const toRight = (i) => {
		setItems(first.right(i, isMoveWithChildren, items))
	}

	const reset = () => {
		setItems(JSON.parse(JSON.stringify(choice.data)))
		console.log('-----------------------------------------reset with', choice.data);
	}

	return (
		<CRUDContext.Provider value={{
			items,
			implementation,
			setImplementation,
			render,
			crud: {
				delete: deleteItem,
				add: addItem,
				update: updateTextItem,
				toUp,
				toDown,
				toLeft,
				toRight,
				reset,
			},
			options: {
				isMoveWithChildren,
				isMoveWithChildrenToggle,
			},
		}}>
			{children}
		</CRUDContext.Provider>
	)
}