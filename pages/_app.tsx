// pages/_app.tsx
import { AppProps } from 'next/app';
import '../app/globals.css'; // Adjust the path to your global styles if necessary
import { AuthContextProvider } from '@/context/authContext';

function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>  
  )
}

export default MyApp;