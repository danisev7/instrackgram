import { NextRequest, NextResponse } from "next/server"
import { IgApiClient } from "instagram-private-api"

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username")
  if (!username) return NextResponse.json({ error: "Username not provided" }, { status: 400 })
  try {
    const ig = new IgApiClient()
    // You must generate device id's before login.
    // Id's generated based on seed
    // So if you pass the same value as first argument - the same id's are generated every time
    ig.state.generateDevice(username)

    // Optionally you can setup proxy url
    ig.state.proxyUrl = "https://o0id8:q64uendx@45.88.101.95:5432"
    await ig.simulate.preLoginFlow()
    // const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)
    return NextResponse.json(
      { deviceId: ig.state.deviceId, deviceString: ig.state.deviceString, devicePayload: ig.state.devicePayload },
      { status: 200 }
    )
    // fetch user data
    // const userResult = await fetch(`https://api.hikerapi.com/v2/user/by/username?username=${username}`, {
    //   headers: {
    //     "x-access-key": "E2McLlJ1ywYXdJgcQNztOecrYhrQOR0x",
    //     accept: "application/json",
    //   },
    // })
    // const user = (await userResult.json()).user
    // // console.log(user.pk)
    // // Get user following
    // let next_page = 0
    // let followingUsers: any[] = []
    // while (next_page !== null) {
    //   const followingResult = await fetch(
    //     `https://api.hikerapi.com/v2/user/following?user_id=${user.pk}&page_id=${next_page}`,
    //     {
    //       headers: {
    //         "x-access-key": "E2McLlJ1ywYXdJgcQNztOecrYhrQOR0x",
    //         accept: "application/json",
    //       },
    //     }
    //   )
    //   const following = await followingResult.json()
    //   // console.log(following)
    //   if (following.response?.users && Array.isArray(following.response?.users))
    //     followingUsers = followingUsers.concat(following.response.users)
    //   next_page = following.next_page_id
    //   console.log("next_page", next_page)
    // }
    // console.log("Following:", followingUsers.length)
    // return NextResponse.json(JSON.stringify(followingUsers), { status: 200 })
  } catch (error) {
    console.log(error)
  }

  // return new NextResponse(null, { status: 200 })

  // return new NextResponse(null, { status: 403 })
}
