import { useWalletLogin } from '@lens-protocol/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function LoginButton() {
  const { login, error, isPending } = useWalletLogin();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      await login(signer);
    }
  };
 
  return (
    <div>
      {error && <p>{error}</p>}
      <button disabled={isPending} onClick={onLoginClick}>Log in</button>
    </div>
  );
}