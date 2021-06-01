import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import useCustomer from '@framework/customer/use-customer'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import getSiteInfo from '@framework/common/get-site-info'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { categories } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages, categories },
  }
}

export default function Profile() {
  const { data } = useCustomer()
  return (
    <Container>
      <Text variant="pageHeading">My Profile</Text>
      {data && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 pr-4">
            <div>
              <Text variant="sectionHeading">Full Name</Text>
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>
            <div className="mt-5">
              <Text variant="sectionHeading">Email</Text>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

Profile.Layout = Layout