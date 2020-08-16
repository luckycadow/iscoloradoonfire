import React, { useState, useEffect } from 'react';
import { Container, Loader, Header } from 'semantic-ui-react';
import { Fire } from './api/fires';
import axios from 'axios';
import Fires from '../components/Fires';
import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [fires, setFires] = useState<Fire[]>([]);

  useEffect(() => {
    axios.get('/api/fires').then((res) => {
      setFires(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Container>
        <Loader active />
      </Container>
    );
  }

  if (!fires.length) {
    return (
      <Container className={styles.container}>
        <div className={styles['no-fires']}>
          <Header textAlign="center" as="h1">
            YAY! Colorado is not on fire.
          </Header>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container className={styles.container}>
        <Header textAlign="center" as="h1">
          Yes, Colorado is on fire.
        </Header>
      </Container>
      <Fires fires={fires} />
    </>
  );
};

export default Home;
