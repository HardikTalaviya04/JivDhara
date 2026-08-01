import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class SecurityErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 🛡️ Sentinel: Log the error securely (e.g., to an external service)
    // Avoid logging sensitive information or stack traces in public console.
    console.error("Uncaught error logged securely:", error.name, error.message);
  }

  public render() {
    if (this.state.hasError) {
      // 🛡️ Sentinel: Provide a generic error message to prevent leaking application internals
      return (
        <View style={styles.container}>
          <Text style={styles.text}>An unexpected error occurred. Please try again later.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
