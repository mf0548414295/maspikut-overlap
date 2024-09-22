import { useState } from "react";
import { Shortage, ShortageStatus } from "../../Models/shortage.model";

interface AddShortageFormProps {
	onAddShortage: (shortage: Shortage) => void;
}

const AddShortageForm: React.FC<AddShortageFormProps> = ({ onAddShortage }) => {
	const [newShortage, setNewShortage] = useState<Shortage>({
		forceId: 0,
		name: '',
		status: ShortageStatus.OPEN,
	});

	const handleSubmit = () => {
		onAddShortage(newShortage);
		setNewShortage({ forceId: 0, name: '', status: ShortageStatus.OPEN });
	};

	return (
		<div>
			<h3>Add Shortage</h3>
			<input
				type='number'
				placeholder='Force ID'
				value={newShortage.forceId}
				onChange={(e) => setNewShortage({ ...newShortage, forceId: parseInt(e.target.value) })}
			/>
			<input
				type='text'
				placeholder='Shortage Name'
				value={newShortage.name}
				onChange={(e) => setNewShortage({ ...newShortage, name: e.target.value })}
			/>
			<select
				value={newShortage.status}
				onChange={(e) => setNewShortage({ ...newShortage, status: parseInt(e.target.value) as ShortageStatus })}
			>
				<option value={ShortageStatus.OPEN}>Open</option>
				<option value={ShortageStatus.IN_PROGRESS}>In Progress</option>
				<option value={ShortageStatus.CLOSED}>Closed</option>
			</select>
			<button onClick={handleSubmit}>Add Shortage</button>
		</div>
	);
};
export default AddShortageForm;
