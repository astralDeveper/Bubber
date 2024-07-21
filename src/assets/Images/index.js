import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Ellipse, Path, Svg} from 'react-native-svg';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App_I = () => {
  return (
    <Svg
      width="50"
      height="50"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.8765 20.8011C19.741 20.5516 21.5808 17.1631 21.8926 15.5C22.8904 16.3731 22.8281 17.7348 22.6722 18.3065C21.9238 20.3022 22.5682 21.6326 22.984 22.0484C21.3625 21.9237 20.5413 21.4767 20.3335 21.2688C17.0904 22.0172 15.3442 21.2688 14.8765 20.8011Z"
        fill="black"
      />
      <Path
        d="M8.48376 16.2796C8.85796 17.9011 8.22391 20.0215 7.86011 20.6452C8.98269 20.7699 10.5106 19.8656 11.1343 19.3979L8.48376 16.2796Z"
        fill="black"
      />
      <Ellipse
        cx="14.7204"
        cy="14.5645"
        rx="6.7043"
        ry="5.76882"
        fill="black"
      />
      <Circle cx="15.5" cy="15.5" r="14.5" stroke="black" />
    </Svg>
  );
};
const Face = () => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M24.4287 12.6836C24.4287 6.05617 19.0561 0.683594 12.4287 0.683594C5.80129 0.683594 0.428711 6.05617 0.428711 12.6836C0.428711 18.6731 4.81693 23.6376 10.5537 24.5378V16.1523H7.50684V12.6836H10.5537V10.0399C10.5537 7.03234 12.3452 5.3711 15.0863 5.3711C16.3992 5.3711 17.7725 5.60547 17.7725 5.60547V8.55859H16.2593C14.7686 8.55859 14.3037 9.48361 14.3037 10.4326V12.6836H17.6318L17.0998 16.1523H14.3037V24.5378C20.0405 23.6376 24.4287 18.6731 24.4287 12.6836Z"
        fill="#1877F2"
      />
    </Svg>
  );
};
const Goo = () => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M23.5649 12.4852C23.5659 11.6961 23.4992 10.9085 23.3655 10.1309H12.4463V14.5902H18.7003C18.5724 15.3024 18.3015 15.9814 17.904 16.5861C17.5066 17.1908 16.9908 17.7088 16.3878 18.1088V21.0035H20.1203C22.3058 18.9885 23.5649 16.0086 23.5649 12.4852Z"
        fill="#4285F4"
      />
      <Path
        d="M12.4462 23.8001C15.5708 23.8001 18.2017 22.7741 20.1202 21.0051L16.3878 18.1105C15.3489 18.8148 14.0109 19.2169 12.4462 19.2169C9.42613 19.2169 6.86276 17.181 5.94613 14.4375H2.10107V17.4206C3.06478 19.3383 4.54251 20.9503 6.36929 22.0768C8.19608 23.2034 10.3 23.8 12.4462 23.8001Z"
        fill="#34A853"
      />
      <Path
        d="M5.94613 14.4386C5.46154 13.0009 5.46154 11.4441 5.94613 10.0065V7.02344H2.10108C1.29038 8.63664 0.868164 10.4171 0.868164 12.2225C0.868164 14.028 1.29038 15.8084 2.10108 17.4216L5.94613 14.4386Z"
        fill="#FBBC04"
      />
      <Path
        d="M12.4465 5.22652C14.0977 5.19955 15.6932 5.82343 16.8881 6.96331L20.1928 3.65859C18.0973 1.69036 15.3212 0.609761 12.4465 0.643338C10.3003 0.643436 8.19632 1.24004 6.36954 2.36656C4.54275 3.49307 3.06502 5.10515 2.10132 7.02281L5.94637 10.0059C6.86301 7.26242 9.42638 5.22652 12.4465 5.22652Z"
        fill="#EA4335"
      />
    </Svg>
  );
};
const Appl = () => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 22 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M20.6841 19.3869C20.3211 20.2254 19.8915 20.9972 19.3938 21.7068C18.7153 22.6742 18.1597 23.3438 17.7316 23.7157C17.0679 24.326 16.3568 24.6386 15.5954 24.6564C15.0487 24.6564 14.3895 24.5008 13.6221 24.1853C12.8522 23.8712 12.1446 23.7156 11.4977 23.7156C10.8192 23.7156 10.0915 23.8712 9.31318 24.1853C8.53364 24.5008 7.90566 24.6653 7.42552 24.6815C6.69533 24.7127 5.9675 24.3912 5.24101 23.7156C4.7773 23.3112 4.19733 22.6179 3.50252 21.6357C2.75707 20.5868 2.14421 19.3706 1.66407 17.984C1.14986 16.4863 0.89209 15.0359 0.89209 13.6318C0.89209 12.0234 1.23964 10.6362 1.93576 9.47372C2.48286 8.53997 3.21069 7.8034 4.12163 7.26269C5.03255 6.72196 6.01683 6.4464 7.0768 6.42879C7.65678 6.42879 8.41734 6.60818 9.3625 6.96077C10.305 7.31454 10.9102 7.49393 11.1755 7.49393C11.3738 7.49393 12.0461 7.28416 13.1858 6.86595C14.2636 6.47812 15.1731 6.3175 15.9183 6.38078C17.9375 6.54374 19.4545 7.33971 20.4634 8.77375C18.6575 9.86794 17.7642 11.4005 17.7819 13.3665C17.7982 14.8978 18.3538 16.1722 19.4456 17.184C19.9404 17.6536 20.493 18.0166 21.1078 18.2744C20.9745 18.661 20.8337 19.0314 20.6841 19.3869V19.3869ZM16.0531 1.16374C16.0531 2.364 15.6146 3.4847 14.7406 4.52201C13.6858 5.75516 12.41 6.46772 11.0265 6.35529C11.0079 6.20439 10.9986 6.0525 10.9986 5.90047C10.9986 4.74822 11.5002 3.51506 12.391 2.50681C12.8357 1.9963 13.4014 1.57183 14.0873 1.23322C14.7717 0.899659 15.4191 0.715191 16.0279 0.683594C16.0457 0.844046 16.0531 1.00452 16.0531 1.16372V1.16374Z"
        fill="white"
      />
    </Svg>
  );
};
const Appl_B = () => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 22 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M20.6841 19.3869C20.3211 20.2254 19.8915 20.9972 19.3938 21.7068C18.7153 22.6742 18.1597 23.3438 17.7316 23.7157C17.0679 24.326 16.3568 24.6386 15.5954 24.6564C15.0487 24.6564 14.3895 24.5008 13.6221 24.1853C12.8522 23.8712 12.1446 23.7156 11.4977 23.7156C10.8192 23.7156 10.0915 23.8712 9.31318 24.1853C8.53364 24.5008 7.90566 24.6653 7.42552 24.6815C6.69533 24.7127 5.9675 24.3912 5.24101 23.7156C4.7773 23.3112 4.19733 22.6179 3.50252 21.6357C2.75707 20.5868 2.14421 19.3706 1.66407 17.984C1.14986 16.4863 0.89209 15.0359 0.89209 13.6318C0.89209 12.0234 1.23964 10.6362 1.93576 9.47372C2.48286 8.53997 3.21069 7.8034 4.12163 7.26269C5.03255 6.72196 6.01683 6.4464 7.0768 6.42879C7.65678 6.42879 8.41734 6.60818 9.3625 6.96077C10.305 7.31454 10.9102 7.49393 11.1755 7.49393C11.3738 7.49393 12.0461 7.28416 13.1858 6.86595C14.2636 6.47812 15.1731 6.3175 15.9183 6.38078C17.9375 6.54374 19.4545 7.33971 20.4634 8.77375C18.6575 9.86794 17.7642 11.4005 17.7819 13.3665C17.7982 14.8978 18.3538 16.1722 19.4456 17.184C19.9404 17.6536 20.493 18.0166 21.1078 18.2744C20.9745 18.661 20.8337 19.0314 20.6841 19.3869V19.3869ZM16.0531 1.16374C16.0531 2.364 15.6146 3.4847 14.7406 4.52201C13.6858 5.75516 12.41 6.46772 11.0265 6.35529C11.0079 6.20439 10.9986 6.0525 10.9986 5.90047C10.9986 4.74822 11.5002 3.51506 12.391 2.50681C12.8357 1.9963 13.4014 1.57183 14.0873 1.23322C14.7717 0.899659 15.4191 0.715191 16.0279 0.683594C16.0457 0.844046 16.0531 1.00452 16.0531 1.16372V1.16374Z"
        fill="black"
      />
    </Svg>
  );
};
const Back_Arrow = () => {
  return (
    <Svg
      width="34"
      height="30"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M5 1L1 5M1 5L5 9M1 5L13 5"
        stroke="#000E08"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const Edit = () => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="15" cy="15" r="15" fill="#00FFF0" />
      <Path
        d="M8.2915 20.3594C8.34033 20.3594 8.38916 20.3545 8.43799 20.3472L12.5444 19.627C12.5933 19.6172 12.6396 19.5952 12.6738 19.5586L23.0229 9.20947C23.0456 9.18689 23.0635 9.16006 23.0758 9.13052C23.088 9.10099 23.0943 9.06933 23.0943 9.03735C23.0943 9.00538 23.088 8.97372 23.0758 8.94418C23.0635 8.91465 23.0456 8.88782 23.0229 8.86523L18.9653 4.80518C18.9189 4.75879 18.8579 4.73438 18.792 4.73438C18.7261 4.73438 18.665 4.75879 18.6187 4.80518L8.26953 15.1543C8.23291 15.1909 8.21094 15.2349 8.20117 15.2837L7.48096 19.3901C7.45721 19.5209 7.46569 19.6555 7.50568 19.7823C7.54567 19.9091 7.61595 20.0242 7.71045 20.1177C7.87158 20.2739 8.07422 20.3594 8.2915 20.3594ZM9.93701 16.1016L18.792 7.24902L20.5815 9.03857L11.7266 17.8911L9.55615 18.2744L9.93701 16.1016ZM23.4844 22.4102H5.51562C5.0835 22.4102 4.73438 22.7593 4.73438 23.1914V24.0703C4.73438 24.1777 4.82227 24.2656 4.92969 24.2656H24.0703C24.1777 24.2656 24.2656 24.1777 24.2656 24.0703V23.1914C24.2656 22.7593 23.9165 22.4102 23.4844 22.4102Z"
        fill="black"
      />
    </Svg>
  );
};
const Male = () => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M16 0V6H14V3.425L10.025 7.375C10.3417 7.84167 10.5833 8.33767 10.75 8.863C10.9167 9.38833 11 9.934 11 10.5C11 12.0333 10.4667 13.3333 9.4 14.4C8.33333 15.4667 7.03333 16 5.5 16C3.96667 16 2.66667 15.4667 1.6 14.4C0.533333 13.3333 0 12.0333 0 10.5C0 8.96667 0.533333 7.66667 1.6 6.6C2.66667 5.53333 3.96667 5 5.5 5C6.05 5 6.59167 5.079 7.125 5.237C7.65833 5.395 8.15 5.641 8.6 5.975L12.575 2H10V0H16ZM5.5 7C4.53333 7 3.70833 7.34167 3.025 8.025C2.34167 8.70833 2 9.53333 2 10.5C2 11.4667 2.34167 12.2917 3.025 12.975C3.70833 13.6583 4.53333 14 5.5 14C6.46667 14 7.29167 13.6583 7.975 12.975C8.65833 12.2917 9 11.4667 9 10.5C9 9.53333 8.65833 8.70833 7.975 8.025C7.29167 7.34167 6.46667 7 5.5 7Z"
        fill="#0D74EE"
      />
    </Svg>
  );
};
const Female = () => {
  return (
    <Svg
      width="11"
      height="17"
      viewBox="0 0 11 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.5 17V15H2.5V13H4.5V10.9C3.18333 10.6667 2.104 10.0373 1.262 9.012C0.420001 7.98667 -0.000665876 6.79933 7.91139e-07 5.45C7.91139e-07 3.93333 0.537667 2.646 1.613 1.588C2.68833 0.53 3.984 0.000667296 5.5 6.28931e-07C7.016 -0.000666038 8.312 0.528667 9.388 1.588C10.464 2.64733 11.0013 3.93467 11 5.45C11 6.8 10.579 7.98767 9.737 9.013C8.895 10.0383 7.816 10.6673 6.5 10.9V13H8.5V15H6.5V17H4.5ZM5.5 9C6.46667 9 7.29167 8.65833 7.975 7.975C8.65833 7.29167 9 6.46667 9 5.5C9 4.53333 8.65833 3.70833 7.975 3.025C7.29167 2.34167 6.46667 2 5.5 2C4.53333 2 3.70833 2.34167 3.025 3.025C2.34167 3.70833 2 4.53333 2 5.5C2 6.46667 2.34167 7.29167 3.025 7.975C3.70833 8.65833 4.53333 9 5.5 9Z"
        fill="#F248A3"
      />
    </Svg>
  );
};
const Down_A = () => {
  return (
    <Svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.05752 5.3075C1.11558 5.2493 1.18455 5.20312 1.26048 5.17161C1.33641 5.1401 1.41781 5.12389 1.50002 5.12389C1.58223 5.12389 1.66363 5.1401 1.73956 5.17161C1.81549 5.20312 1.88446 5.2493 1.94252 5.3075L9.00002 12.3663L16.0575 5.3075C16.1749 5.19014 16.334 5.12421 16.5 5.12421C16.666 5.12421 16.8252 5.19014 16.9425 5.3075C17.0599 5.42486 17.1258 5.58403 17.1258 5.75C17.1258 5.91597 17.0599 6.07514 16.9425 6.1925L9.44252 13.6925C9.38446 13.7507 9.31549 13.7969 9.23956 13.8284C9.16363 13.8599 9.08223 13.8761 9.00002 13.8761C8.91781 13.8761 8.83641 13.8599 8.76048 13.8284C8.68455 13.7969 8.61558 13.7507 8.55752 13.6925L1.05752 6.1925C0.999315 6.13445 0.953136 6.06548 0.921628 5.98955C0.89012 5.91361 0.873901 5.83221 0.873901 5.75C0.873901 5.66779 0.89012 5.58639 0.921628 5.51046C0.953136 5.43453 0.999315 5.36556 1.05752 5.3075Z"
        fill="black"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.05752 0.307503C1.11558 0.249299 1.18455 0.203121 1.26048 0.171613C1.33641 0.140105 1.41781 0.123886 1.50002 0.123886C1.58223 0.123886 1.66363 0.140105 1.73956 0.171613C1.81549 0.203121 1.88446 0.249299 1.94252 0.307503L9.00002 7.36625L16.0575 0.307503C16.1156 0.249393 16.1846 0.203298 16.2605 0.171849C16.3365 0.140401 16.4178 0.124214 16.5 0.124214C16.5822 0.124214 16.6636 0.140401 16.7395 0.171849C16.8154 0.203298 16.8844 0.249393 16.9425 0.307503C17.0006 0.365613 17.0467 0.4346 17.0782 0.510524C17.1096 0.586448 17.1258 0.667823 17.1258 0.750003C17.1258 0.832183 17.1096 0.913558 17.0782 0.989483C17.0467 1.06541 17.0006 1.13439 16.9425 1.1925L9.44252 8.6925C9.38446 8.75071 9.31549 8.79688 9.23956 8.82839C9.16363 8.8599 9.08223 8.87612 9.00002 8.87612C8.91781 8.87612 8.83641 8.8599 8.76048 8.82839C8.68455 8.79688 8.61558 8.75071 8.55752 8.6925L1.05752 1.1925C0.999315 1.13445 0.953136 1.06548 0.921628 0.989545C0.89012 0.913614 0.873901 0.832212 0.873901 0.750003C0.873901 0.667794 0.89012 0.586393 0.921628 0.510461C0.953136 0.43453 0.999315 0.36556 1.05752 0.307503Z"
        fill="black"
      />
    </Svg>
  );
};
const Up_A = () => {
  return (
    <Svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.9422 8.6925C16.8841 8.75071 16.8151 8.79689 16.7392 8.8284C16.6633 8.8599 16.5819 8.87612 16.4997 8.87612C16.4175 8.87612 16.3361 8.8599 16.2601 8.8284C16.1842 8.79689 16.1152 8.75071 16.0572 8.6925L8.99968 1.63375L1.94218 8.6925C1.82482 8.80986 1.66565 8.87579 1.49968 8.87579C1.33371 8.87579 1.17453 8.80986 1.05718 8.6925C0.939817 8.57514 0.873888 8.41597 0.873888 8.25C0.873888 8.08403 0.939818 7.92486 1.05718 7.8075L8.55718 0.307505C8.61523 0.2493 8.6842 0.203122 8.76014 0.171614C8.83607 0.140106 8.91747 0.123887 8.99968 0.123887C9.08189 0.123887 9.16329 0.140106 9.23922 0.171614C9.31515 0.203122 9.38412 0.2493 9.44218 0.307505L16.9422 7.8075C17.0004 7.86556 17.0466 7.93453 17.0781 8.01046C17.1096 8.08639 17.1258 8.1678 17.1258 8.25C17.1258 8.33221 17.1096 8.41362 17.0781 8.48955C17.0466 8.56548 17.0004 8.63445 16.9422 8.6925Z"
        fill="black"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.9422 13.6925C16.8841 13.7507 16.8151 13.7969 16.7392 13.8284C16.6633 13.8599 16.5819 13.8761 16.4997 13.8761C16.4175 13.8761 16.3361 13.8599 16.2601 13.8284C16.1842 13.7969 16.1152 13.7507 16.0572 13.6925L8.99968 6.63375L1.94218 13.6925C1.88407 13.7506 1.81508 13.7967 1.73916 13.8282C1.66323 13.8596 1.58186 13.8758 1.49968 13.8758C1.4175 13.8758 1.33612 13.8596 1.2602 13.8282C1.18427 13.7967 1.11529 13.7506 1.05718 13.6925C0.999067 13.6344 0.952971 13.5654 0.921522 13.4895C0.890074 13.4136 0.873888 13.3322 0.873888 13.25C0.873888 13.1678 0.890074 13.0864 0.921522 13.0105C0.952971 12.9346 0.999067 12.8656 1.05718 12.8075L8.55718 5.3075C8.61523 5.2493 8.6842 5.20312 8.76014 5.17161C8.83607 5.14011 8.91747 5.12389 8.99968 5.12389C9.08189 5.12389 9.16329 5.14011 9.23922 5.17161C9.31515 5.20312 9.38412 5.2493 9.44218 5.3075L16.9422 12.8075C17.0004 12.8656 17.0466 12.9345 17.0781 13.0105C17.1096 13.0864 17.1258 13.1678 17.1258 13.25C17.1258 13.3322 17.1096 13.4136 17.0781 13.4895C17.0466 13.5655 17.0004 13.6344 16.9422 13.6925Z"
        fill="black"
      />
    </Svg>
  );
};
const Mess = ({Color}) => {
  return (
    <Svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.5031 15.7623C20.2939 14.354 20.75 12.7312 20.75 11C20.75 5.61475 16.3853 1.25 11 1.25C5.61475 1.25 1.25 5.61475 1.25 11C1.25 16.3853 5.61475 20.75 11 20.75C12.7312 20.75 14.354 20.2939 15.7623 19.5031L20.75 20.75L19.5031 15.7623Z"
        stroke={Color ? Color : '#797C7B'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.8083 11.3499C10.9144 11.2438 11.0856 11.2438 11.1918 11.3499C11.2979 11.4561 11.2979 11.6273 11.1918 11.7334C11.0856 11.8396 10.9144 11.8396 10.8083 11.7334C10.7032 11.6273 10.7032 11.4561 10.8083 11.3499"
        stroke={Color ? Color : '#797C7B'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.47491 11.3499C6.58108 11.2438 6.75225 11.2438 6.85841 11.3499C6.96458 11.4561 6.96458 11.6273 6.85841 11.7334C6.75225 11.8396 6.58108 11.8396 6.47491 11.7334C6.36983 11.6273 6.36983 11.4561 6.47491 11.3499"
        stroke={Color ? Color : '#797C7B'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.1416 11.3499C15.2477 11.2438 15.4189 11.2438 15.5251 11.3499C15.6312 11.4561 15.6312 11.6273 15.5251 11.7334C15.4189 11.8396 15.2477 11.8396 15.1416 11.7334C15.0365 11.6273 15.0365 11.4561 15.1416 11.3499"
        stroke={Color ? Color : '#797C7B'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const Messeg = () => {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.5031 15.7623C20.2939 14.354 20.75 12.7312 20.75 11C20.75 5.61475 16.3853 1.25 11 1.25C5.61475 1.25 1.25 5.61475 1.25 11C1.25 16.3853 5.61475 20.75 11 20.75C12.7312 20.75 14.354 20.2939 15.7623 19.5031L20.75 20.75L19.5031 15.7623Z"
        stroke="#FFF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.8083 11.3499C10.9144 11.2438 11.0856 11.2438 11.1918 11.3499C11.2979 11.4561 11.2979 11.6273 11.1918 11.7334C11.0856 11.8396 10.9144 11.8396 10.8083 11.7334C10.7032 11.6273 10.7032 11.4561 10.8083 11.3499"
        stroke="#FFF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.47491 11.3499C6.58108 11.2438 6.75225 11.2438 6.85841 11.3499C6.96458 11.4561 6.96458 11.6273 6.85841 11.7334C6.75225 11.8396 6.58108 11.8396 6.47491 11.7334C6.36983 11.6273 6.36983 11.4561 6.47491 11.3499"
        stroke="#FFF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.1416 11.3499C15.2477 11.2438 15.4189 11.2438 15.5251 11.3499C15.6312 11.4561 15.6312 11.6273 15.5251 11.7334C15.4189 11.8396 15.2477 11.8396 15.1416 11.7334C15.0365 11.6273 15.0365 11.4561 15.1416 11.3499"
        stroke="#FFF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const Sugest = ({Color}) => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="15" cy="15" r="14.5" stroke={Color ? Color : '#797C7B'} />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.5708 14.1865V12.0558H21.733V14.1865H23.8636V15.3487H21.733V17.4793H20.5708V15.3487H18.4401V14.1865H20.5708ZM12.1116 15.4261C11.5413 14.7505 11.0795 13.4892 11.0795 12.6059V11.281C11.0795 10.459 11.4061 9.67076 11.9873 9.08955C12.5685 8.50834 13.3568 8.18182 14.1787 8.18182C15.0007 8.18182 15.789 8.50834 16.3702 9.08955C16.9514 9.67076 17.2779 10.459 17.2779 11.281V12.6059C17.2779 13.4892 16.813 14.7544 16.2459 15.4277L15.9662 15.7593C15.509 16.3009 15.6516 16.9897 16.2908 17.3011L20.6761 19.4411C21.1526 19.6736 21.5393 20.288 21.5393 20.8226V21.3549C21.5388 21.5602 21.4569 21.757 21.3115 21.902C21.1661 22.047 20.969 22.1283 20.7637 22.1281H7.59298C7.38776 22.1281 7.19092 22.0467 7.04566 21.9017C6.90041 21.7568 6.81859 21.5601 6.81818 21.3549V20.8226C6.81818 20.2918 7.20403 19.6736 7.6813 19.4403L12.0666 17.3004C12.7027 16.9904 12.8507 16.3024 12.392 15.7585L12.1116 15.4261Z"
        fill={Color ? Color : '#797C7B'}
      />
    </Svg>
  );
};
const Mag = () => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.9583 15.9583L19.1667 19.1667M18.25 9.54168C18.25 4.7322 14.3511 0.833344 9.54167 0.833344C4.73219 0.833344 0.833336 4.7322 0.833336 9.54168C0.833336 14.3512 4.73219 18.25 9.54167 18.25C14.3511 18.25 18.25 14.3512 18.25 9.54168Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const Back = () => {
  return (
    <Svg
      width="19"
      height="15"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M5 1L1 5M1 5L5 9M1 5L13 5"
        stroke="#000E08"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const Back_W = () => {
  return (
    <Svg
      width="29"
      height="25"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M5 1L1 5M1 5L5 9M1 5L13 5"
        stroke="#FFFF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const Pen = () => {
  return (
    <Svg
      width="28"
      height="28"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11.06 6L12 6.94L2.92 16H2V15.08L11.06 6ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z"
        fill="black"
      />
    </Svg>
  );
};
const Clip = () => {
  return (
    <Svg
      width="28"
      height="30"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10.879 6.375L5.39297 11.861C4.56697 12.687 4.56697 14.027 5.39297 14.853V14.853C6.21897 15.679 7.55897 15.679 8.38497 14.853L15.617 7.621C17.132 6.106 17.132 3.65 15.617 2.135V2.135C14.102 0.619999 11.646 0.619999 10.131 2.135L2.89897 9.367C0.694972 11.571 0.694972 15.143 2.89897 17.347V17.347C5.10297 19.551 8.67497 19.551 10.879 17.347L15.268 12.958"
        stroke="#000E08"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const Cam = () => {
  return (
    <Svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7 6V6.75C7.25076 6.75 7.48494 6.62467 7.62404 6.41603L7 6ZM8.40627 3.8906L7.78223 3.47457V3.47457L8.40627 3.8906ZM15.5937 3.8906L16.2178 3.47457L15.5937 3.8906ZM17 6L16.376 6.41603C16.5151 6.62467 16.7492 6.75 17 6.75V6ZM14.25 13.5C14.25 14.7426 13.2426 15.75 12 15.75V17.25C14.0711 17.25 15.75 15.5711 15.75 13.5H14.25ZM12 15.75C10.7574 15.75 9.75 14.7426 9.75 13.5H8.25C8.25 15.5711 9.92893 17.25 12 17.25V15.75ZM9.75 13.5C9.75 12.2574 10.7574 11.25 12 11.25V9.75C9.92893 9.75 8.25 11.4289 8.25 13.5H9.75ZM12 11.25C13.2426 11.25 14.25 12.2574 14.25 13.5H15.75C15.75 11.4289 14.0711 9.75 12 9.75V11.25ZM7.62404 6.41603L9.0303 4.30662L7.78223 3.47457L6.37596 5.58397L7.62404 6.41603ZM10.0704 3.75H13.9296V2.25H10.0704V3.75ZM14.9697 4.30662L16.376 6.41603L17.624 5.58397L16.2178 3.47457L14.9697 4.30662ZM13.9296 3.75C14.3476 3.75 14.7379 3.95888 14.9697 4.30662L16.2178 3.47457C15.7077 2.70953 14.8491 2.25 13.9296 2.25V3.75ZM9.0303 4.30662C9.26214 3.95888 9.65243 3.75 10.0704 3.75V2.25C9.1509 2.25 8.29226 2.70953 7.78223 3.47457L9.0303 4.30662ZM21.25 10V17H22.75V10H21.25ZM18 20.25H6V21.75H18V20.25ZM2.75 17V10H1.25V17H2.75ZM6 20.25C4.20507 20.25 2.75 18.7949 2.75 17H1.25C1.25 19.6234 3.37665 21.75 6 21.75V20.25ZM21.25 17C21.25 18.7949 19.7949 20.25 18 20.25V21.75C20.6234 21.75 22.75 19.6234 22.75 17H21.25ZM18 6.75C19.7949 6.75 21.25 8.20507 21.25 10H22.75C22.75 7.37665 20.6234 5.25 18 5.25V6.75ZM6 5.25C3.37665 5.25 1.25 7.37665 1.25 10H2.75C2.75 8.20507 4.20507 6.75 6 6.75V5.25ZM6 6.75H7V5.25H6V6.75ZM18 5.25H17V6.75H18V5.25Z"
        fill="#000E08"
      />
      <Circle cx="12" cy="6" r="1" fill="#000E08" />
    </Svg>
  );
};
const X = () => {
  return (
    <Svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M18 6L6 18"
        stroke="#0D368C"
        stroke-width="1.33"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6 6L18 18"
        stroke="#0D368C"
        stroke-width="1.33"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export {
  App_I,
  Face,
  Goo,
  Appl,
  Back_Arrow,
  Appl_B,
  Edit,
  Male,
  Female,
  Down_A,
  Up_A,
  Mess,
  Sugest,
  Mag,
  Back,
  Clip,
  Cam,
  Back_W,
  Messeg,
  Pen,
  X,
};
export default App_I;
