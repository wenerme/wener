Concurrency vs. Parallelism
=========================
摘自 Akka 文档

Concurrency and parallelism are related concepts, but there are small differences. Concurrency means that two or more tasks are making progress even though they might not be executing simultaneously. This can for example be realized with time slicing where parts of tasks are executed sequentially and mixed with parts of other tasks.
Parallelism on the other hand arise when the execution can be truly simultaneous.


Deadlock vs. Starvation vs. Live-lock
==================================
摘自 Akka 文档

Deadlock arises when several participants are waiting on each other to reach a specific state to be able to progress.
As none of them can progress without some other participant to reach a certain state (a “Catch-22” problem) all
affected subsystems stall. Deadlock is closely related to blocking, as it is necessary that a participant thread be
able to delay the progression of other threads indefinitely.
In the case of deadlock, no participants can make progress, while in contrast Starvation happens, when there are
participants that can make progress, but there might be one or more that cannot. Typical scenario is the case
of a naive scheduling algorithm that always selects high-priority tasks over low-priority ones. If the number of
incoming high-priority tasks is constantly high enough, no low-priority ones will be ever finished.
Livelock is similar to deadlock as none of the participants make progress. The difference though is that instead
of being frozen in a state of waiting for others to progress, the participants continuously change their state. An
example scenario when two participants have two identical resources available. They each try to get the resource,
but they also check if the other needs the resource, too. If the resource is requested by the other participant, they
try to get the other instance of the resource. In the unfortunate case it might happen that the two participants
“bounce” between the two resources, never acquiring it, but always yielding to the other.