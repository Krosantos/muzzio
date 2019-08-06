import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import SampleHandModal from './SampleHandModal';
import { menuButton } from './styles.scss';

const SAMPLE_HAND_BUTTON_TEXT = 'Sample Hand';

const SampleHand = () => {
	const [isSampleHandModalOpen, setSampleHandModalOpen] = useState(false);
	const closeSampleHandModal = useCallback(() => setSampleHandModalOpen(false), []);
	const openSampleHandModal = useCallback(() => setSampleHandModalOpen(true), []);

	return (
		<div>
			<button
				className={menuButton}
				onClick={openSampleHandModal}
				type="button"
			>
				{SAMPLE_HAND_BUTTON_TEXT}
			</button>
			{isSampleHandModalOpen
                && ReactDOM.createPortal(<SampleHandModal closeModal={closeSampleHandModal} />, document.querySelector('body'))}
		</div>
	);
};

export default SampleHand;
