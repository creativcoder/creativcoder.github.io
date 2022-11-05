import { SiGithubsponsors } from "react-icons/si";
import Link from 'next/link'
import {useEffect, useState} from 'react'

function License() {
  return (
    <div className="flex-col items-center justify-center mt-8 mb-8">
      <div className="text-center text-xs mx-auto">
        © 2016-{new Date().getFullYear().toString()} creativcoder. All rights
        reserved.
      </div>
    </div>
  );
}

function Sponser() {
  useEffect(()=>{
    const script = document.createElement("script");
    let form = document.getElementById('donateForm');
    script.setAttribute('src','https://checkout.razorpay.com/v1/payment-button.js');
    script.setAttribute('data-payment_button_id','pl_KcJKB9oNok9oKg');
    if (form && form?.children.length > 0){
    } else {
      form?.appendChild(script);
    }
  },[]);

  return (
    <div className="px-4 py-2 flex-col cursor-pointer items-center justify-center space-x-2 rounded-md transition-colors">
      {/* <Link href="https://ko-fi.com/P5P71YZ0L">
      <img alt="ko-fi" src="https://ko-fi.com/img/githubbutton_sm.svg">
      </img>
      </Link> */}
      <form id="donateForm" className="pl-3 pt-4"></form>
    </div>
  );
}

export const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-center w-full">
        <Sponser />
        <License />
      </footer>
    </>
  );
};
