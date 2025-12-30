import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
                    <div className="bg-red-950/50 border border-red-500/50 rounded-lg p-8 max-w-2xl w-full backdrop-blur-xl">
                        <h1 className="text-3xl font-bold text-red-500 mb-4">Algo salió mal</h1>
                        <p className="text-gray-300 mb-4">La aplicación ha encontrado un error crítico.</p>
                        <div className="bg-black/50 p-4 rounded-md overflow-auto max-h-60 mb-6 border border-white/10">
                            <code className="text-red-400 text-sm font-mono break-words">
                                {this.state.error?.toString()}
                            </code>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            Recargar Página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
