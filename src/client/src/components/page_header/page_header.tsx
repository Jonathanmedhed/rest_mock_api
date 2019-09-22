import * as React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../with_auth/with_auth";
import logo from './logo.png';

interface PageHeaderInternalProps {
    token: string | null;
}

interface PageHeaderInternalState {
}

class PageHeaderInternal extends React.Component<PageHeaderInternalProps, PageHeaderInternalState> {
    
    public render() {
        return [
            <div><Link className="left" to="/"><img className="icon" src={logo} alt="Logo"  ></img></Link></div>,
            <div className="top-navbar">
                <div className="container">
                    <Link className="left" to="/">Home</Link>
                    
                </div>
            </div>
        ];
    }

}

export const PageHeader = withAuth(props => <PageHeaderInternal token={props.authToken} />)

