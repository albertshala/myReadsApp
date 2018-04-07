export function getFullCategoryName(catName){
	switch (catName){
		case 'currentlyReading':
			return 'Currently Reading';
		case 'wantToRead':
			return 'Want to Read';
		case 'read':
			return 'Read';
		default:
			return 'None';
	}
};