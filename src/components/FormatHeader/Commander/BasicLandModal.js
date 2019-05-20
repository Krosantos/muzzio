import React, { useCallback, useMemo } from 'react';
import useBasicLands from '@hooks/useBasicLands';
import ManaCost from '@components/ManaCost';
import { identityMap } from '@constants';
import ModalContainer from './ModalContainer';
import { basicLandRow, manaModal } from './styles.scss';

const BasicRow = ({ identity }) => {
	const landName = useMemo(() => identityMap[identity].name, [identity]);
	const { getCount, setCount } = useBasicLands(identity);
	const count = useMemo(() => getCount(identity), [identity, getCount]);
	const handleChange = useCallback((event) => setCount(event, identity), [identity, setCount]);

	return (
		<div className={basicLandRow}>
			<input
				onChange={handleChange}
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
