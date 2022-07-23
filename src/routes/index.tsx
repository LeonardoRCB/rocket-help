import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth , {FirebaseAuthTypes} from '@react-native-firebase/auth'

import { SignIn } from '../screens/SignIn';
import { AppRoutes } from './app.routes';
import { Loading } from '../components/Loading';

export function Routes() {
  //anota se esta carregando
  const [loading, setIsLoading] = useState(true);
  //anota se o usuario esta autenticado
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  
  useEffect(() => {
    const subscriber = auth()
      .onAuthStateChanged(response => {
        setUser(response);
        setIsLoading(false);
      });
   
      return subscriber;
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {/* se usuario existe exibe as rotas autenticadas , se nao matem user na tela de login*/}
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}