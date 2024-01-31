"use client"
import {
  BaseActiveInactive,
  BaseButton,
  BaseCheckBox,
  BaseCustomSelect,
  BaseInformation,
  BaseInput,
  BaseMainProfileInfo,
  BaseNotification,
  BaseOperationSuccess,
  BasePosition,
  BaseProfilePictureWithRedact,
  BaseProfileRightSide,
  BaseSearch,
  BaseSearchGroup,
  BaseSelect,
  BaseSidebarClose,
  BaseUpload,
} from '@/components';

const page = () => {
  return (
    <div>
      <BaseActiveInactive active rolename="დეველოპერი" code="112231" level="სინიორ" label labeltext="პოზიცია" />
      <BaseActiveInactive rolename="დეველოპერი" code="112231" level="სინიორ" label labeltext="პოზიცია" />
      <BaseButton variant="primary">გამოძახება</BaseButton>
      <BaseButton variant="secondary">გამოძახება</BaseButton>
      <BaseButton variant="registration">გამოძახება</BaseButton>
      <BaseButton variant="clear">გამოძახება</BaseButton>
      <BaseButton variant="warning">გამოძახება</BaseButton>
      <BaseButton variant="disabled">გამოძახება</BaseButton>
      <BaseButton variant="add">გამოძახება</BaseButton>
      <BaseButton variant="tablebutton">გამოძახება</BaseButton>
      <BaseButton variant="groupdelete">გამოძახება</BaseButton>
      <BaseButton variant="profileedit">გამოძახება</BaseButton>
      <BaseButton variant="profileeditclose">გამოძახება</BaseButton>
      <BaseButton variant="profileeditsave">გამოძახება</BaseButton>
      <BaseButton variant="tab">გამოძახება</BaseButton>
      <BaseButton variant="tabback">გამოძახება</BaseButton>
      <BaseCheckBox type="checkbox" label="გამოაჩნე პაროლი" checked />
      <BaseCustomSelect edit />
      <BaseCustomSelect logout />
      <BaseCustomSelect filter />
      <BaseInformation
        label="ინფორმაცია"
        data={[
          {
            text: 'ინფორმაციული ტექნოლოგიები',
            inputlabeltext: 'შეიყვანე',
            inputplaceholdertext: 'შეიყვანეთ',
            img: '/assets/pencil.svg',
          },
        ]}
      />
      <BaseInformation
        label="ინფორმაცია"
        contact
        data={[
          {
            text: 'ინფორმაციული ტექნოლოგიები',
            inputlabeltext: 'შეიყვანე',
            inputplaceholdertext: 'შეიყვანეთ',
            img: '/assets/pencil.svg',
          },
        ]}
      />
      <BaseInput placeholder="შეიყვანე ინფო" showLabel labelText="საინფორმაციო" />
      <BaseInput placeholder="შეიყვანე ინფო" showLabel labelText="საინფორმაციო" readOnly />
      <BaseInput placeholder="შეიყვანე ინფო" showLabel labelText="საინფორმაციო" disabled />
      <BaseInput
        placeholder="შეიყვანე ინფო"
        showLabel
        labelText="საინფორმაციო"
        notification
        notificationText="არასწორად შეყვანილი კოდი"
      />
      <BaseInput
        placeholder="შეიყვანე ინფო"
        showLabel
        labelText="საინფორმაციო"
        notification
        notificationText="არასწორად შეყვანილი კოდი"
        mustFilled
      />
      <BaseMainProfileInfo />
      <BaseNotification imgUrl="/assets/notification.svg" notificationTitle="შეტყობინება" notification="test" />
      <BaseNotification imgUrl="/assets/warning.svg" notificationTitle="შეტყობინება" notification="test" />
      <BaseNotification imgUrl="/assets/danger.svg" notificationTitle="შეტყობინება" notification="test" />
      <BaseNotification imgUrl="/assets/done.svg" notificationTitle="შეტყობინება" notification="test" />
      <BaseOperationSuccess success successText="წარმატებით გაიარა" successBtnText="დახურვა" />
      <BaseOperationSuccess
        warning
        warningText="წარმატებით გაიარა"
        warningBtnText={[{ label: 'დიახ' }, { label: 'არა' }]}
      />
      <BaseOperationSuccess deleteText="წარმატებით გაიარა" warningBtnText={[{ label: 'დიახ' }, { label: 'არა' }]} />
      <BasePosition mainLabel="დეველოპერი" accessLabel="ყველაფერზე" />
      <BaseProfilePictureWithRedact />
      <BaseProfilePictureWithRedact rightSideProfile />
      <BaseProfileRightSide />
      <BaseSearch />
      <BaseSearchGroup />
      <BaseSelect showLabel labelText="აირჩიეთ" />
      <BaseSelect showLabel labelText="აირჩიეთ" readOnly />
      <BaseSelect showLabel labelText="აირჩიეთ" disabled />
      <BaseSelect showLabel labelText="აირჩიეთ" notification notificationText="გთხოვთ აირჩიოთ" />
      <BaseSelect showLabel labelText="აირჩიეთ" options={[{ label: 'აირჩიე', key: 'აირჩიე' }]} />
      <BaseSelect showLabel labelText="აირჩიეთ" mustFilled options={[{ label: 'აირჩიე', key: 'აირჩიე' }]} />
      <BaseSidebarClose />
      <BaseUpload />
    </div>
  );
};

export default page;
