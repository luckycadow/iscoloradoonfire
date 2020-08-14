import React from 'react';
import Map from './Map';
import { Fire } from '../pages/api/fires';
import styles from '../styles/Fires.module.scss';
import { Container, Card } from 'semantic-ui-react';

export interface FiresProps {
  fires: Fire[];
}

const Fires: React.FC<FiresProps> = ({ fires }) => {
  return (
    <Container>
      <Map fires={fires} />
      {fires.map((fire) => (
        <div className={styles['fire-card']} key={fire.link}>
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
  );
};

export default Fires;
