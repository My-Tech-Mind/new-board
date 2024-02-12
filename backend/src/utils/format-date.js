import format from 'date-fns/format';
const formatDate = (array)=>{
	const formattedCreatingBoard = array.map(board => ({
		...board,
		creation_date: format(new Date(board.creation_date), 'yyyy-MM-dd kk:mm:ss'),
		update_date: format(new Date(board.update_date), 'yyyy-MM-dd kk:mm:ss')
	}));
	return formattedCreatingBoard;
}

export { formatDate };