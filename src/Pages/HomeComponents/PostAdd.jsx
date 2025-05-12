import React from 'react';

const PostAdd = () => {
    return (
        <div>
            <div className='flex items-start gap-3'>
                <img className='w-5 h-5 rounded-full' src="" alt="Profile picture" />
                <textarea className='w-full rounded-lg min-h-10' name="post" id="post"></textarea>
            </div>
            <div>
                <div>
                    <input name='privacy' type="text" />
                    <datalist id='privacy'>
                        <option value="Public">Public</option>
                        <option value="Friends">Friends</option>
                        <option value="Only me">Only me</option>
                    </datalist>
                </div>
                <button className='btn' type='submit'>Post</button>
            </div>
        </div>
    );
};

export default PostAdd;