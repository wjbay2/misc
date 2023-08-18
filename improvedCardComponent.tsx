/* eslint-disable tailwindcss/no-custom-classname */

/*
I've change it to typescript to allow more stict typing
*/

import React, { useEffect, useState } from 'react';

type CardProps = {
  title: string;
  text: string;
  target: string;
  linkTitle: string | JSX.Element;
  href: string;
  rel?: string;
  onClick: () => void;
  linkClassName: string;
};

function Card({
  title,
  text,
  target,
  linkTitle,
  href,
  rel,
  onClick,
  linkClassName,
}: CardProps) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        target={target}
        rel={rel}
        href={href}
        onClick={onClick}
      >
        {linkTitle}
      </a>
    </div>
  );
}

type ResponseTitleBodyType = {
  en: string;
  id: string;
};

type APIResponseType = {
  id: number;
  title: ResponseTitleBodyType;
  body: ResponseTitleBodyType;
  link_title: string;
  link: string;
};

type CardAdaptedType = {
  id: number;
  title: string;
  link_title: string;
  link: string;
  text: string;
};

export default function Page() {
  const [cards, setCards] = useState<CardAdaptedType[]>([]);

  const fetchData = async () => {
    const response = await fetch(
      'https://my-json-server.typicode.com/savayer/demo/posts',
    );

    const json: APIResponseType[] = await response.json();

    const newData: CardAdaptedType[] = json.map((item: APIResponseType) => ({
      id: item.id,
      title: item.title.en,
      link_title: item.link_title,
      link: item.link,
      text: `${item.body.en.substr(0, 50)}...`,
    }));

    setCards(newData);
  };

  // fetch data only first render
  useEffect(() => {
    fetchData();
  }, []);

  function analyticsTrackClick(url: string) {
    // sending clicked link url to analytics
    console.log(url);
  }

  return (
    <div>
      {cards &&
        cards.map((item) => (
          <Card
            title={item.title}
            linkTitle={item.link_title}
            href={item.link}
            text={item.text}
            linkClassName={item.id === 1 ? 'card__link--red' : ''}
            target={item.id === 1 ? '_blank' : ''}
            onClick={() => analyticsTrackClick(item.link)}
          />
        ))}
    </div>
  );
}
