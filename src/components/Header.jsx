import React from 'react';
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <div className="title">
                <Link to="/"><h1>CRUD MySQLi ( Procedural ) </h1></Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/" className="link">Home</Link></li>
                    <li><Link to="/home/new" className="link">Insert</Link></li>
                </ul>
            </nav>
        </header>
    )
}
