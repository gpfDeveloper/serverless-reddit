import { CommentItemProps, PostItemProps } from '../types/post';

export const POSTS: PostItemProps[] = [
  {
    id: '1',
    vote: 1,
    createdBy: 'Pengfei',
    createdAt: '2022-06-11T17:21:07.5272333Z',
    title: 'What is AWS Apmlify',
    content:
      'AWS Amplify is a set of products and tools that enable mobile and front-end web developers to build and deploy secure, scalable full-stack applications, powered by AWS. AWS Amplify is a set of products and tools that enable mobile and front-end web developers to build and deploy secure, scalable full-stack applications, powered by AWS. AWS Amplify is a set of products and tools that enable mobile and front-end web developers to build and deploy secure, scalable full-stack applications, powered by AWS.',
    numOfComments: 5,
  },
  {
    id: '2',
    vote: 2,
    createdBy: 'Pengfei',
    createdAt: '2022-06-13T17:21:07.5272333Z',
    title: 'Where is the sauce.',
    content:
      'AWS Amplify is a set of products and tools that enable mobile and front-end web developers to build and deploy secure, scalable full-stack applications, powered by AWS.',
    numOfComments: 6,
    img: 'https://media2.giphy.com/media/1tZ4Coe9v2H8A/200.webp?cid=ecf05e4758f9fym2hvciqnuy5qlewzd83bmxnl4ivw5qk29j&rid=200.webp&ct=g',
  },
  {
    id: '3',
    vote: 0,
    createdBy: 'Pengfei',
    createdAt: '2022-06-13T17:21:07.5272333Z',
    title: 'Here is the movie.',
    content:
      'AWS Amplify is a set of products and tools that enable mobile and front-end web developers to build and deploy secure, scalable full-stack applications, powered by AWS.',
    numOfComments: 6,
    img: 'https://preview.redd.it/lwnlhgrhwa891.jpg?width=640&crop=smart&auto=webp&s=650ff9c32918761f0ae200812ea94e176820f508',
  },
];

export const COMMENTS: CommentItemProps[] = [
  {
    createdAt: '2022-06-13T17:21:07.5272333Z',
    createdBy: 'Pengfei',
    content:
      'WS Amplify is a set of products and tools that enable mobile and front-end web developers to build and deploy secure, scalable full-stack applications, powered by AWS.',
  },
  {
    createdAt: '2022-06-12T17:21:07.5272333Z',
    createdBy: 'Pengfei',
    content:
      'some list items: \n 1. list one is here \n 2. list two is here \n 3. list three is here',
  },
  {
    createdAt: '2022-06-11T17:21:07.5272333Z',
    createdBy: 'Pengfei',
    content:
      '**This game is very interesting:** \n ![](https://images.gog-statics.com/8e401209b82f9a43ff803287e3970e703b1eaeb505ae25c96108499dd7a210e5_product_card_v2_mobile_slider_639.jpg)',
  },
];
