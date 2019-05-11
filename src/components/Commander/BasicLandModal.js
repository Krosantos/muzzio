import React, { useMemo } from 'react';
import useBasicLands from '@hooks/useBasicLands';
import ManaCost from '@components/ManaCost';
import ModalContainer from './ModalContainer';
import { basicLandRow, manaModal } from './styles.scss';

const identityMap = {
	B: 'Swamp',
	C: 'Wastes',
	G: 'Forest',
	R: 'Mountain',
	U: 'Island',
	W: 'Plains',
};

const BasicRow = ({ identity }) => {
	const landName = useMemo(() => identityMap[identity], [identity]);
	const { count, setCount } = useBasicLands(identity);

	return (
		<div className={basicLandRow}>
			<input
				onChange={setCount}
				value={count}
			/>
			<div>
				{landName}
				<ManaCost cost={identity} />
			</div>
		</div>
	);
};

const BasicLandModal = ({ closeModal, identities }) => (
	<ModalContainer closeModal={closeModal}>
		<div className={manaModal}>
			{identities.map((identity) => (
				<BasicRow
					key={identity}
					identity={identity}
				/>
			))}
		</div>
	</ModalContainer>
);

export default React.memo(BasicLandModal);
