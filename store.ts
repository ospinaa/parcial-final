/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useState,
	type PropsWithChildren,
} from 'react';

export type AppContextValue = {
	message: string;
	setMessage: (value: string) => void;
	resetMessage: () => void;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);

const defaultMessage = 'Context API ready';

export function AppContextProvider({ children }: PropsWithChildren) {
	const [message, setMessage] = useState(defaultMessage);

	const value = {
		message,
		setMessage,
		resetMessage: () => setMessage(defaultMessage),
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
