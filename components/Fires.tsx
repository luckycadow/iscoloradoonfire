import React, { useState } from 'react';
import Map from './Map';
import { Fire } from '../pages/api/fires';
import styles from '../styles/Fires.module.scss';
import { Container, Card } from 'semantic-ui-react';

export interface FiresProps {
  fires: Fire[];
}

const Fires: React.FC<FiresProps> = ({ fires }) => {
  const [selectedFire, setSelectedFire] = useState<Fire | null>();

  return (
    <>
      <Map fires={fires} selectedFire={selectedFire} />
      <Container>
        <div className={styles.fade}></div>
        {fires.map((fire) => (
          <div
            className={styles['fire-card']}
            key={fire.link}
            onMouseOver={() => setSelectedFire(fire)}
            onMouseOut={() => setSelectedFire(null)}
          >
            <Card
              fluid
              href={fire.link}
              header={fire.title}
              meta={`${fire.latitude.toFixed(2)}, ${fire.longitude.toFixed(2)}`}
              description={fire.description}
            />
          </div>
        ))}
      </Container>
    </>
  );
};

export default Fires;
