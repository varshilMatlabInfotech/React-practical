import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AppDispatch, RootState } from "@/store";
import { bookmarkCheck } from "@/store/user/userSlice";
import type { USERI } from "@/types/Index";
import { Avatar } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const { data } = useSelector((s: RootState) => s.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleBookMarkCheck = (arg: USERI) => {
    dispatch(bookmarkCheck(arg));
  };

  return (
    <div className="min-h-screen w-full px-10 py-10">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableCell>ID</TableCell>
          <TableCell>Avatar</TableCell>
          <TableCell>Login</TableCell>
          <TableCell>User View Type</TableCell>
          <TableCell>Action</TableCell>
        </TableHeader>
        <TableBody>
          {data?.filter((fu) => !fu?.is_book_mark)?.length > 0 ? (
            <>
              {data
                ?.filter((fu) => !fu?.is_book_mark)
                .map((u, idx) => (
                  <TableRow key={`${u.id}-${idx}`}>
                    <TableCell>{u?.id}</TableCell>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={u.avatar_url}
                          alt={u.login}
                          className="w-10 h-10 rounded-full"
                        />
                        <AvatarFallback>{u.login}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{u?.login}</TableCell>
                    <TableCell>
                      <Badge className="capitalize">{u.user_view_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => handleBookMarkCheck(u)}
                      >
                        <Bookmark />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ) : (
            <TableRow>
              <TableCell className="text-center py-5" colSpan={5}>
                No User Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;
