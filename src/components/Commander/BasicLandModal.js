import React, { useMemo } from 'react';
import useBasicLands from '@hooks/useBasicLands';
import ManaCost from '@components/ManaCost';
import { identityMap } from '@constants';
import ModalContainer from './ModalContainer';
import { basicLandRow, manaModal } from './styles.scss';

const BasicRow = ({ identity }) => {
	const landName = useMemo(() => identityMap[identity].name, [identity]);
	const { count, setCount } = useBasicLands(identity);

	return (
		<div className={basicLandRow}>
			<input
				onChange={setCount}
				type="number"
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
