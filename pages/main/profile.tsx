import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { app, auth, db, useAuthContext } from "@/context/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, UserPlus, Users, X } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable, getStorage, deleteObject } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { Textarea } from "@/components/ui/textarea";


const ProfilePage = () => {
    const { user, setUser, isCurrentUser } = useAuthContext();
    const storage = getStorage(app);
    console.log('user', user);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [isEditingBanner, setIsEditingBanner] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [editedBio, setEditedBio] = useState(user.bio);


    const handleEditBio = () => {
        setIsEditingBio(true);
        setEditedBio(user.bio);
      };
    
    const handleCancelEdit = () => {
        setIsEditingBio(false);
        setEditedBio(user.bio);
    };
    
    const handleSaveBio = async () => {
        try {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, { bio: editedBio });
          
          setUser((prevUser: any) => ({ ...prevUser, bio: editedBio }));
          setIsEditingBio(false);
          
          // If you're using AuthContext, update it as well
          // updateUserData({ bio: editedBio });
          
          console.log("Bio updated successfully");
        } catch (error) {
          console.error("Error updating bio:", error);
          // Handle error (e.g., show error message to user)
        }
    };


    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        setUser((prev: { followers: number; }) => ({ ...prev, followers: isFollowing ? prev.followers - 1 : prev.followers + 1 }));
    };
    const handleJoin = () => {
        setIsMember(!isMember);
        setUser((prev: { members: number; }) => ({ ...prev, members: isMember ? prev.members - 1 : prev.members + 1 }));
    };  

    const onDrop = useCallback(async (acceptedFiles: any[]) => {
        const file = acceptedFiles[0];
        const storageRef = ref(storage, `user-banners/${user.uid}/${file.name}`);
        
        try {
          const snapshot = await uploadBytesResumable(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);

          // If there's an existing banner, delete it
            if (user && user.bannerUrl) {
                const oldBannerRef = ref(storage, user.bannerUrl);
                try {
                await deleteObject(oldBannerRef);
                console.log("Old banner deleted successfully");
                } catch (deleteError) {
                console.error("Error deleting old banner:", deleteError);
                // Continue with upload even if delete fails
                }
            }
          
          // Update Firestore document
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            bannerUrl: downloadURL
          });
    
          // Update local state
          setUser((prev: any) => ({ ...prev, bannerUrl: downloadURL }));
          setIsEditingBanner(false);
        } catch (error) {
          console.error("Error uploading banner:", error);
          // Handle error (e.g., show error message to user)
        }
      }, [user.uid]);
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    
    return (
        <main id="profile" className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="relative">
        {/* Banner */}
        <div className="w-full h-48 md:h-64 relative overflow-hidden rounded-t-lg">
        {user.bannerUrl ? (
          <Image
            src={user.bannerUrl}
            alt="Profile Banner"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <p>No banner image available</p>
          </div>
        )}
        {auth.currentUser && !isEditingBanner && (
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={() => setIsEditingBanner(true)}
            >
              <Edit2 className="mr-2 h-4 w-4" /> Edit Banner
            </Button>
          )}
        </div>
        {isEditingBanner && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-black p-6 rounded-lg max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Update Banner</h2>
                <Button className="bg-neutral-400" variant="ghost" size="sm" onClick={() => setIsEditingBanner(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-lg text-black dark:text-white">Drop the image here ...</p>
                ) : (
                  <p>Drag 'n' drop a banner image here, or click to select one</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 items-center justify-center">
            <Avatar className="w-32 h-32 border-4 border-white">
              <AvatarImage src={user.profilePicture} alt={user.username} />
            </Avatar>
            <h2 className="text-2xl font-bold mt-5">{user.username}</h2>
            {auth.currentUser?.uid != user.uid && (
              <div className="flex space-x-2">
                <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
                <Button onClick={handleJoin} variant={isMember ? "outline" : "default"}>
                  <Users className="mr-2 h-4 w-4" />
                  {isMember ? 'Leave' : 'Join'}
                </Button>
              </div>
            )}
          </div>
        </div>

      {/* User Bio */}
      <div className="mt-20 relative">
        {isEditingBio ? (
            <>
            <Textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="w-full mb-2"
                rows={4}
            />
            <div className="flex justify-center space-x-2 w-full">
                <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
                </Button>
                <Button onClick={handleSaveBio}>
                Save
                </Button>
            </div>
            </>
        ) : (
            <>
            <div className="text-center">
                <p>{user.bio}</p>
            </div>
            {auth.currentUser?.uid == user.uid && (
                <div className="flex justify-center mt-2">
                <Button variant="outline" size="sm" className="w-28 mt-5" onClick={handleEditBio}>
                    Edit Bio
                </Button>
                </div>
            )}
            </>
            )}
        </div>

      {/* Stats Cards */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <StatCard title="Reads" value={user.reads} />
        <StatCard title="Followers" value={user.followers} />
        <StatCard title="Members" value={user.members} />
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string, value: number }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </CardContent>
    </Card>
  )
}

export default ProfilePage;