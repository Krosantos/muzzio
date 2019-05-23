import React, { useCallback, useMemo } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import useBasicLands from '@hooks/useBasicLands';
import ManaCost from '@components/ManaCost';
import { identityMap } from '@constants';
import ModalContainer from './ModalContainer';
import { basicLandRow, manaModal } from './styles.scss';

const BasicRow = ({ identity }) => {
	const landName = useMemo(() => identityMap[identity].name, [identity]);
	const { getCount, setCount } = useBasicLands(identity);
	const count = useMemo(() => getCount(identity), [identity, getCount]);
	const handleChange = useCallback((event) => {
		let toSet = get(event, 'target.value');

		while (toSet.charAt(0) === '0')
			toSet = toSet.substr(1);
		set(event, 'target.value', toSet);

		setCount(toSet, identity);
	}, [identity, setCount]);

	return (
		<div className={basicLandRow}>
			<input
				onChange={handleChange}
				placeholder="0"
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
