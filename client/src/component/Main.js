import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './layout/Landing';
import StudentDashboard from './Dashboard/StudentDashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import AdminLogin from './auth/AdminLogin';
import InstructorLogin from './auth/InstructorLogin';
import PrivateRoute from './routing/PrivateRoute';
import AdminRoute from './routing/AdminRoute';
import AdminCreate from './auth/AdminCreate';
import AdminDashboard from './Dashboard/AdminDashboard';
import InstructorDashboard from './Dashboard/InstructorDashboard';
import AddAdmin from './addUsers/addAdmin';
import InstructorRoute from './routing/InstructorRoute';
import viewCourses from './Instructor/viewCourses';
import addInstructor from './addUsers/addInstructor';
import Admins from './View/ViewAddmin';
import DeleteAdmin from './Delete/DeleteAdmin';
import About from './layout/About';
import viewAssignments from './View/ViewAssignment';
import viewInstructorAssignment from './View/ViewInstructorAssignment';
import viewCourse from './View/ViewCourse';
import viewInstructor from './View/ViewInstructors';
import ProfileDashboard from './Dashboard/ProfileDashboard';
import addAssignment from './Instructor/addAssignment';
import courseSubmit from './Instructor/courseSumbits';
import viewCompletedAssignment from './Instructor/viewCompletedAssignment';
import addLecture from './Instructor/addLecture';
import CourseReq from './Instructor/courseRequests';
import CreateProfile from './profile-form/CreateProfile';
import AdminCreateProfile from './profile-form/AdminCreateProfile';
import InstructorCreateProfile from './profile-form/InstructorCreateProfile';
import uploadAssignment from './student/uploadAssignment';
import EditProfile from './profile-form/EditProfile';
import instructorprofiledashboard from './Dashboard/InstructorProfileDashboard';
import adminprofiledashboard from './Dashboard/AdminProfileDashboard';
import DeleteAssignment from './Delete/DeleteAssignment';








const Main = () => (
    <main>
        <Switch>
            <Route exact path ='/' component={Landing}/>
            <Route exact path ='/login' component={Login}/>
            <Route exact path ='/register' component={Register}/>
            <Route exact path ='/about' component={About}/>
            <Route exact path ='/adminlogin' component={AdminLogin} />
            <Route exact path ='/addadmin' component={AddAdmin} />
            <Route exact path ='/admincreate' component={AdminCreate} />
            <Route exact path ='/viewadmin' component={Admins}/>
            <Route exact path ='/delete/:id' component={DeleteAdmin}/>
            <Route exact path ='/assignment/delete/:id' component={DeleteAssignment}/>
            <Route exact path ='/instructorlogin' component={InstructorLogin} />
            <PrivateRoute exact path ='/studentdashboard' component={StudentDashboard} />
            <PrivateRoute exact path ='/profiledashoard' component={ProfileDashboard}/>
            <AdminRoute exact path ='/AdminDashboard' component={AdminDashboard} />
            <AdminRoute exact path ='/addinstructor' component={addInstructor} />
            <InstructorRoute exact path ='/instructordashboard' component={InstructorDashboard} />
            <InstructorRoute exact path ='/instructordashboard/courses' component={viewCourses} />
            <InstructorRoute exact path ='/instructordashboard/courses/get' component={courseSubmit} />            
            <InstructorRoute exact path ='/instructordashboard/courses/submit/assignment' component={addAssignment} />
            <InstructorRoute exact path ='/instructordashboard/courses/submit/lecture' component={addLecture} />
            <InstructorRoute exact path ='/instructordashboard/notifications' component={CourseReq} />
            <Route exact path ='/ViewAssignment' component={viewAssignments} />
            <Route exact path ='/viewCourse' component={viewCourse}/>
            <Route exact path ='/viewInstructor' component={viewInstructor} />
            <PrivateRoute exact path ='/create-profile' component={CreateProfile} />
            <Route exact path ='/uploadAssignment' component={uploadAssignment}/>
            <AdminRoute exact path ='/admincreateprofile' component={AdminCreateProfile} />
            <InstructorRoute exact path='/instructorcreateprofile' component={InstructorCreateProfile} />
            <Route exact path ='/instructorprofiledashboard' component={instructorprofiledashboard} />
            <Route exact path ='/adminprofiledashboard' component={adminprofiledashboard} />
            <InstructorRoute export path='/viewInstructorAssignment' component={viewInstructorAssignment}/>
             




            



            
        </Switch>
    </main>
)

export default Main;
