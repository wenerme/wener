# Spring Web Flow

Spring Web Flow builds on Spring MVC and allows implementing the "flows" of a web application. A flow encapsulates a sequence of steps that guide a user through the execution of some business task. It spans multiple HTTP requests, has state, deals with transactional data, is reusable, and may be dynamic and long-running in nature..

- http://projects.spring.io/spring-webflow/
- 主要解决的问题
  - Visualizing the flow is very difficult.
  - The application has a lot of code accessing the HTTP session.
  - Enforcing controlled navigation is important but not possible.
  - Proper browser back button support seems unattainable.
  - Browser and server get out of sync with "Back" button use.
  - Multiple browser tabs causes concurrency issues with HTTP session data.
- https://en.wikipedia.org/wiki/Spring_Web_Flow
  - 关注的问题
    - How do you express page navigation rules?
    - How do you manage navigation and conversational state?
    - How do you facilitate modularization and reuse?
- 案例
  - CAS
