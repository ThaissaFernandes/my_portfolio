import { GithubIcon } from '../../assets/icons/GithubIcon'
import { InstagramIcon } from '../../assets/icons/InstagramIcon'
import { LinkedinIcon } from '../../assets/icons/LinkedinIcon'
import { WhatsappIcon } from '../../assets/icons/WhatsappIcon'
import { Header } from '../../components/Header/header'

export default function Contact () {
  return (
    <div className='bg-white'>
      <Header />
      <div
        className='mt-10'
        style={{width:'65rem'}}
      >
        <div className='px-4 sm:px-0'>
          <h3 className='text-base font-semibold leading-7 text-gray-900'>
            My contacts
          </h3>
          <p className='mt-1 text-sm leading-6 text-gray-500'>
            Personal details.
          </p>
        </div>
        <div className='mt-6 border-t border-gray-100 w-200'>
          <dl className='divide-y divide-gray-100'>
            <div className='px-4 py-6 flex justify-around items-center'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Full name
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                Thaíssa Fernandes Silva
              </dd>
            </div>
            <div className='px-4 py-6 flex justify-around items-center'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                Email address
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                thaissafernandes235@gmail.com
              </dd>
            </div>
            <div className='px-4 py-6 flex justify-around items-center'>
              <div className='flex-row flex justify-center gap-3 items-center'>
                <dt className='text-sm font-medium leading-6 text-gray-900'>
                  Github
                </dt>
                <GithubIcon />
              </div>
              <a
                target='_blank'
                href='https://www.github.com/thaissafernandes'
                className='mt-1 text-sm leading-6 text-blue-600 sm:col-span-2 sm:mt-0 cursor-pointer'
              >
                <u>ThaissaFernandes</u>
              </a>
            </div>
            <div className='px-4 py-6 flex justify-around items-center'>
              <div className='flex-row flex justify-center gap-3 items-center'>
                <dt className='text-sm font-medium leading-6 text-gray-900'>
                  Instagram
                </dt>
                <InstagramIcon />
              </div>
              <a
                target='_blank'
                href='https://www.instagram.com/thaissafernandes14/?hl=en'
                className='mt-1 text-sm leading-6 text-blue-600 sm:col-span-2 sm:mt-0 cursor-pointer'
              >
                <u>@thaissafernandes14</u>
              </a>
            </div>
            <div className='px-4 py-6 flex justify-around items-center'>
              <div className='flex-row flex justify-center gap-3 items-center'>
                <dt className='text-sm font-medium leading-6 text-gray-900'>
                  LinkedIn
                </dt>
                <LinkedinIcon />
              </div>
              <a
                target='_blank'
                href='https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile'
                className='mt-1 text-sm leading-6 text-blue-600 sm:col-span-2 sm:mt-0 cursor-pointer'
              >
                <u>Thaíssa Fernandes Silva</u>
              </a>
            </div>
            <div className='px-4 py-6 flex justify-around items-center'>
              <div className='flex-row flex justify-center gap-3 items-center'>
                <dt className='text-sm font-medium leading-6 text-gray-900'>
                  WhatsApp
                </dt>
                <WhatsappIcon />
              </div>
              <a
                target='_blank'
                href='https://wa.me/+5537991144306'
                className='mt-1 text-sm leading-6 text-blue-600 sm:col-span-2 sm:mt-0 cursor-pointer'
              >
                <u>+55 (37) 9 9114-4306</u>
              </a>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
