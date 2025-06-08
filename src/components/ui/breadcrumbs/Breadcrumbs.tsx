import { Link, useLocation } from 'react-router-dom';

export function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const crumbs = pathnames.map((_, index) => {
    const url = '/' + pathnames.slice(0, index + 1).join('/');
    // const key = pathnames[index];

    return (
      <span key={url}>
        <Link to={url}>{url}</Link>
        {index < pathnames.length - 1 && ' / '}
      </span>
    );
  });

  return (
    <nav>
      <Link to="/">Home</Link>
      {pathnames.length > 0 && ' / '}
      {crumbs}
    </nav>
  );
};
