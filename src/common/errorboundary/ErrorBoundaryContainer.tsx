/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable n/handle-callback-err */
import React from "react";
import { Image } from "@mantine/core";
import ErrorImg from "assets/img/error.svg";

class ErrorBoundaryContainer extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if ((this.state as any)?.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex min-w-screen min-h-screen items-center justify-center flex-col">
          <Image src={ErrorImg} width="100%" maw={500} />
          <div className="text-4xl font-light md:text-6xl text-center font-light">
            Something went wrong.
          </div>
          <p className="mt-4 text-2xl">We are trying to fix it.</p>
        </div>
      );
    }

    return (this.props as any).children;
  }
}
export default ErrorBoundaryContainer;
