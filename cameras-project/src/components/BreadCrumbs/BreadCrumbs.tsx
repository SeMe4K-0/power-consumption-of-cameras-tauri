import React, { type FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../../constants/routes';
import './BreadCrumbs.css';

interface ICrumb {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  crumbs: ICrumb[];
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbs }) => {
  return (
    <ul className="breadcrumbs">
      <li>
        <Link to={ROUTES.HOME}>{ROUTE_LABELS.HOME}</Link>
      </li>
      {!!crumbs.length &&
        crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <li className="slash">/</li>
            {index === crumbs.length - 1 ? (
              <li>{crumb.label}</li>
            ) : (
              <li>
                <Link to={crumb.path || ""}>{crumb.label}</Link>
              </li>
            )}
          </React.Fragment>
        ))}
    </ul>
  );
};
