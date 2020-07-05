
import {useRef, useEffect} from 'react'
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'

const Comment = ({commentBox}) => (<div ref={commentBox} className="comments"></div>)
export default Comment