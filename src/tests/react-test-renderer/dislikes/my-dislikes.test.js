import React from 'react';
import {act, create} from "react-test-renderer"
import tuitsJson from "./tuits.json"
import MyDislikes from "./my-dislikes";

test('disliked tuits render', () => {
  let dislikesRender
  act(() => {
    dislikesRender = create(
      <MyDislikes
        dislikeTuit={tuitsJson}/>
    )
  })
  const root = dislikesRender.root
  const ttrTuits = root.findAllByProps({
    className: 'ttr-tuit'})
  expect(ttrTuits.length).toBe(tuitsJson.length)
  ttrTuits.forEach((ttrTuit, ndx) => {
    expect(ttrTuit.props.children).toBe(tuitsJson[ndx].tuit)
  })
})